# activitiesSchema 
```
[open] -> available
```
## Structure:
```
activitiesSchema
├── {1} name
├── {2} short_description
├── {3} image
├── {4} duration: 
│ ├── {4.1} min_duration
│ ├── {4.2} max_duration
│ ├── {4.3} average
├── {5} rating
├── {6} free_cancellation_available
```
## Explain:
#### **1. name**
- Description: activities's names
- Type: String
- Constaint: 
  - Is required
#### **2. short_description**
- Description: a short description of these activities
- Type: String
- Constaint: 
  - Is required
#### **3. image**
- Description: images path
- Type: String
- Default: []
#### **4. duration**
- Description: Duration of the activities/tour
- Type: Object
- Constaint: 
  - Is required
  - min value: 0
  - max value: 5
##### **4.1 min_duration**
- Description: the overall min duration (hour) of the activities
- Type: Number
- Constaint: 
  - Is required
  - Greater than 0 
##### **4.2 max_duration**
- Description: the overall max duration (minute) of the activities
- Type: Number
- Constaint: 
  - Is required
  - Greater than or equal to min_duration
##### **4.3 average**
- Description: the overall max duration (minute) of the activities
- Type: Number:
- Constaint: 
  - Noted that average will be computed with min_duration and max_duration after create and update
#### **5. rating**
- Description: rating using a 5 star system
- Type: String
- Constaint: 
  - Is required
  - min value: 0
  - max value: 5
- Default: 0
#### **6. free_cancellation_available**
- Description: Do the provider has free cancellation service
- Type: Boolean
- Default: true

## request template
```
{
   "name":"",
   "short_description":"",
   "image":"",
   "duration":{
      "min_duration":,
      "max_duration":,
   },
   "rating":,
   "free_cancellation_available":
}
```
### example:
```
{
   "name":"Guided City Sightseeing Walking Tour",
   "short_description":"A guided walking tour to discover some of Hanoi's top attractions",
   "image": "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/222171388.jpg?k=5e8c66b47d003a3652ad270a965c8cf854b816db44e51c99ba83e785fd3905c0&o=",
   "duration":{
      "min_duration":180,
      "max_duration":480
   },
   "rating":4.4,
   "free_cancellation_available": true
}
```