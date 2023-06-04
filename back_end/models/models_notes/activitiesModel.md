# activitiesSchema 
## Structure:
```
activitiesSchema
├── name
├── short_description
├── rating
├── free_cancellation_available
├── pick_up_included
├── description
├── [included]
├── [not_included]
├── [accessibility]
├── [health_safety]
├── [accessibility]
├── [health_safety]
├── [languages]
├── additional_information
├── itinerary
│ ├── duration
│ │ ├── start
│ │ ├── end
│ ├── [stops]
│ │ ├── name
│ │ ├── admission_ticket
│ │ ├── description
│ │ ├── duration
├── location
│ ├── departure
│ ├── end
├── ticket
│ ├── [open]
│ │ ├── start
│ │ ├── end
│ ├── [select_time]
│ ├── max_number_of_people
│ ├── price

```
## Explain:
#### **name**
- Description: activities's names
- Type: String
- Constaint: 
  - Is required
#### **short_description**
- Description: a short description of these activities
- Type: String
- Constaint: 
  - Is required
#### **rating**
- Description: rating using a 5 star system
- Type: String
- Constaint: 
  - Is required
  - min value: 0
  - max value: 5
- Default: 0
#### **free_cancellation_available**
- Description: Do the provider has free cancellation service
- Type: Boolean
- Default: true
#### **pick_up_included**
- Description: Do the provider pick up the customer or not 
- Type: Boolean
- Default: true
#### **description**
- Description: a full description of these activities
- Type: String
- Constaint: 
   - Is required
#### **included**
- Description: what services are included in these activities ?
- Type: array of String
#### **not_included**
- Description: what services are not included in these activities ?
- Type: array of String
#### **accessibility**
-- Description:  some other accessibility service the the provider can provide
- Type: array of String
#### **health_safety**
- Description: measures and protocols implemented by the activities/tour providers to ensure the well-being and safety of their customers (in some context, they also give a vague description like "Suitable for all fitness levels" to emphasize the activities/tour is suitable for everybody)
- Type: array of String
#### **languages**
- Description: languages spoken by guide
- Type: array of String
- Constaint: 
  - Is required
#### **additional_information**
- Description: supplementary details or specific information like Requirements, Cancellation Policy, Important Notices, Contact Information, ....
- Type: String
#### **itinerary**
- Description: stops and there information
- Type: array of object
- Constaint: 
  - Is required
##### **duration**
  
#### **location**
- Description: 
- Type: String
- Constaint: 
#### **ticket**
- Description: 
- Type: String
- Constaint: 


