export const post = (body: any) => ({
  method: "POST",
  body: JSON.stringify(body),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
