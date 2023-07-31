# Bella & Bona - Test project

## Data model

### Customer

I'm assuming that in the real world this entity would have fields related to the authenticated user by some customer-dedicated app.

For simplicity, I'll just consider a _customer id_ and a _name_ to display.

**Customer model**:

- Id: number
- Name: string
- (rel: many) Orders

> Maybe a profile picture?

### Order

A _customer_ makes _orders_ of _products_.

**Order model**:

- Id: number
- Date: date
- Status: `processing` | `done`
- (rel: one) Customer
- (rel: many) Products (through _product orders_)

### Product

I'm assuming there's a _product catalogue_ from where the _customer_ can pick the _products_ to order;  
therefore a _product_ can be added to more than one _order_.

> This must mean that the relationship between _order_ and _product_ is _many to many_, right?

**Product model**:

- Id: number
- SKU: string
- Name: string
- Description: string
- ImageUrl: string
- (rel: many): Orders (through _product orders_)

> I'm assuming there's an _image storage_ elsewhere, hence for the _product_ I'll just store an ImageUrl.

### (join entity) ProductOrder

From what I'm seeing in the `data.json`, there _must_ be a _many to many_ relationship between _order_ and _product_.

**The join entity model**:

- Id: number
- Name: string
- Quantity: number
- ProductId: number
- OrderId: number
- (OrderDate: date - if I understood the spec, this is redundant with the actual _order date_)
- Status: `processing` | `done`
- (rel: one): Order
- (rel: one): Product

## Backend endpoints

### Customer

#### Get

I'm assuming by the _singular_ form that this endpoint will only expose individual data of a _customer_, filtered by id.

**Endpoint**: `/customer/:id`;

### Orders

#### Get

From the other requirements I understand that this endpoint will filter _orders_ by _customer_.  
However it looks more rational to me to use a query parameter for this sort of filtering, since one could also want a generic list of orders, maybe filtered by other criteria.

**Endpoint**: `/orders?customer=<customer_id>`

#### Post/patch

> Why both _post_ and _patch_?

From the other requirements I understand that this endpoint will only be used to update the _order_ status, which will propagate the new status to all the _product orders_ (join entity).  
However, I imagine someone whould expect to update an _order_ by adding or removing _products_ to that _order_.  
Since in the spec there is no use case for this feature, I won't implement it.

**Endpoint**: `/orders/:id`

### Products

#### Get

From the order requirements I understand that this endpoint will filter _products_ by _customer_.  
In this case, it looks rational to also provide a filter by _order_. Hence I'll use query parameters both to filter by _customer_ and by _order_.

**Endpoint**: `/products?order=<order_id>&customer=<customer_id>`

### ProductOrder

#### Post/patch

> Why both _post_ and _patch_?

From the use cases described in the spec I understand that this endpoint will not be used to update a _product_ from the catalogue,
but rather to update the _product order_ data, such as quantity or status.  
Hence I'm assuming this endpoint will not affect any actual _product_, but just the relationship payload between an _order_ and a _product_.

**Endpoint**: `/product-order/:id`

> Could also be something like `/order/:order_id/product/:product_id`, but as I can see from `data.json`, the join entity has its own _id_, so I'm using it.

## Frontend views

### Customer products

This view should list all the _products orders_ associated with a _customer_.

This means, for each _order_ the _customer_ has made, the view will show all of its _products_,
along with the associated _product orders_ aggregated quantity and status.

For each _product order_ the user should be able to update the quantity and status.

> Are the products aggregated by SKU as stated in the `React` section of the spec, or by _product id_ as stated in the trailing note about `data.json`?
>
> I'm assuming that the status aggregation is something like "if any status is `processing`, the aggregated status is `processing`".
>
> Since every _product_ shown by this view is an aggregation of different actual records, whenever the user updates a quantity,
> I'll just update one or more entries in such a way that the sum is the requested one (this could get tricky, let's see).

**Path**: `/customer/:id/products`

### Customer orders

This view should list all the _orders_ made by a _customer_.

I'm assuming that the goal of this view is not to list the _products_ of each of the listed _orders_ but rather to see the date and status,
and to be able to update the status.