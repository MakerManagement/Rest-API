--- 
category: Item 
webpath: '/items/:item_id' 
title: 'Delete a item' 
type: 'DELETE' 

--- 
 
This method allows the user to a item. 
 
### Request 
 
* **`:item_id`** is the id the item to delete. 
* **The body is omitted**. 
 
### Response 
 
Replies back if the delete was successful.
 
```Status: 200 OK``` 
```{
  "message": "Item removed!"
}``` 
 
For errors responses, see the [response status codes documentation](#response-status-codes).