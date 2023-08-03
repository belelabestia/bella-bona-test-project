# Bella & Bona - Test project

## Dev setup

1. In `test-project-database`, run `docker compose up -d`;
1. In both `test-project-backend` and `test-project-frontend`, run `npm i`;
1. In `test-project-backend`, run `npx prisma migrate reset`, then `npm run dev`;
1. In `test-project-frontend`, run `npm start`;
1. Up and running!

### Test instructions

1. Run application in [dev](#dev-setup);
1. Make sure the database is fresh after seeding;
1. In `test-project-e2e` run `npm i`, then `npx playwright test --ui`;
1. Run any test!

## Data model

### Customer

I'm assuming that in the real world this entity would have fields related to the authenticated user by some customer-dedicated app.

For simplicity, I'll just consider a _customer id_ and a _name_ to display.

**Customer model**:

- Id: number
- Name: string
- (rel: many) Orders

### Order

A _customer_ makes _orders_ of _products_.

**Order model**:

- Id: number
- Date: date
- Status: `processing` | `done`
- (rel: one) Customer
- (rel: many) Products (through _ordered products_)

### Product

> **This entity won't be mapped in the project. See [here](#clarification-patch).**

I'm assuming there's a _product catalogue_ from where the _customer_ can pick the _products_ to order;  
therefore a _product_ can be added to more than one _order_.

> This must mean that the relationship between _order_ and the actual _product_ is _many to many_.

**Product model**:

- Id: number
- SKU: string
- Name: string
- Description: string
- Price: number
- (rel: many): Orders (through _ordered products_)

### (join entity) OrderedProduct

> **This entity will be handled by the _products_ endpoint in the project. See [here](#clarification-patch).**

From what I'm seeing in the `data.json`, there _must_ be a _many to many_ relationship between _order_ and _product_.

**The join entity model**:

- Id: number
- Name: string
- Quantity: number
- ProductId: number - this represents the SKU
- OrderId: number
- OrderDate: date
- Status: `processing` | `done`
- (rel: one): Order
- (rel: one): Product

## Backend endpoints

> **Premise**: though it would have been trivial to achieve it, I intentionally didn't wrap backend response body in an object with `data` and `status` attributes. This is because in the context of this test project I found of no value to implement such a boilerplate wrapper rather than using standard HTTP response codes and contents.

### Customer

#### Get

I'm assuming by the _singular_ form that this endpoint will only expose individual data of a _customer_, filtered by id.

However I find it useful to also implement a _get all_ endpoint in order to create a customer selection view in the client.  
For the sake of simplicity and of sticking to the requirements, I kept the singular form.

- **Endpoint (all)**: `/customer`
- **Endpoint**: `/customer/:id`;

### Orders

#### Get

From the other requirements I understand that this endpoint will filter _orders_ by _customer_.  
However it looks more rational to me to use a query parameter for this sort of filtering, since one could also want a generic list of orders, maybe filtered by other criteria.

- **Endpoint**: `/orders?customer=<customer_id>`

#### Post

From the other requirements I understand that this endpoint will only be used to update the _order_ status, which will propagate the new status to all the _ordered products_ (join entity).  
However, I imagine someone whould expect to update an _order_ by adding or removing _products_ to that _order_.  
Since in the spec there is no use case for this feature, I won't implement it.

- **Endpoint**: `/orders/:id`

### Products

#### Get

From the order requirements I understand that this endpoint will filter _products_ by _customer_.  
In this case, it looks rational to also provide a filter by _order_. Hence I'll use query parameters both to filter by _customer_ and by _order_.

- **Endpoint**: `/products?order=<order_id>&customer=<customer_id>`

### OrderedProduct

#### Post

From the use cases described in the spec I understand that this endpoint will not be used to update a _product_ from the catalogue,
but rather to update the _ordered product_ data, such as quantity or status.  
Hence I'm assuming this endpoint will not affect any actual _product_, but just the relationship payload between an _order_ and a _product_.

- **Endpoint**: `/products/:id`

> Could also be something like `/order/:order_id/product/:product_id`, but as I can see from `data.json`, the join entity has its own _id_, so I'm using it.

## Frontend views

### Customer products

This view should list all the _ordered products_ associated with a _customer_.

This means, for each _order_ the _customer_ has made, the view will show a _product group_ wrapping
all of its _ordered products_ grouped by product SKU, along with the aggregated quantity and status.

> A quantity is aggregated by its sum, while I consider a status to be `processing` if at least one status is `processing`, else `done`.

For each _ordered product_ the user should be able to update quantity and status.  
I'll also assume that when the last _product_ of an _order_ is marked `done`, the related _order_ is also marked `done`.

> Since the requirements define a _get all_ and a _post by id_ endpoint, but not a _get by id_ endpoint,
> I'll reload the whole collection whenever the user edits a record.

**Path**: `/customer/:id/products`

### Customer orders

This view should list all the _orders_ made by a _customer_ and allow the user to change their status.  
When the status of an _order_ changes, all the _products_ associated with that order is updated accordingly.

**Path**: `/customer/:id/orders`

## Clarification patch

For the sake of this project, the entity _ordered product_ will be handled by the _products_ endpoint, while the concrete _product_ entity will not be handled at all.

I'm aware that this could cause naming confusion, but at least at the data model level I want to leave a track that the relation graph has a "missing arm" towards the _product_ catalogue.