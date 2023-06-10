# activitiesSchema 
```
[open] -> available
```
## Structure:
```
activitiesSchema
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
├── location_departure
├── location_end
├── [itinerary_stops]
│ ├──name
│ ├── admission_ticket
│ ├── description
│ ├── duration
├── available
│ ├── start
│ ├── end
├── ticket
│ ├── [select_time]
│ ├── [ticket_type]
│ │ ├── name
│ │ ├── people_per_ticket
│ │ ├── price
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
#### **image**
- Description: images path
- Type: String
- Default: []
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
- Description:  some other accessibility service the the provider can provide
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
- Type: Object
- Constaint: 
  - Is required
- Object attribute:
  - min_duration
  - max_duration
  - stops
##### **min_duration**
- Description: the overall min duration (hour) of the activities
- Type: Number
- Constaint: 
  - Is required
  - Greater than 0 
##### **max_duration**
- Description: the overall max duration (hour) of the activities
- Type: Number
- Constaint: 
  - Is required
  - Greater than or equal to 0 
##### **stops**
- Description: stops during the trip
- Type: array of Object
- Constaint: 
  - Is required
- Object attribute:
  - name
  - admission_ticket
  - description
  - duration
###### **name**
- Description: stop's name or location
- Type: String
- Constaint: 
  - Is required
###### **admission_ticket**
- Description: Whether the prodiver provide admission ticket
- Type: Boolean
- Default: False
###### **description**
- Description: Description of what activities customer will have 
- Type: String
- Constaint: 
  - Is required
###### **duration**
- Description: How long will customer will send at the stop (minute)
- Type: Number
- Constaint: 
  - Is required
#### **location_departure**
- Description: The meeting/pick_up location
- Type: String
- Constaint: 
  - Is required
#### **location_end**
- Description: The location that the provider will drop up off
- Type: String
<!-- - Constaint: 
  - Is required -->
#### **ticket**
- Description: Some of ticket description
- Type: Object
- Constaint: 
  - Is required
- Object attribute:
  - open
  - select_time
  - max_number_of_people
  - price
##### **open**
- Description: tickets's selling period
- Type: Array of Object
- Constaint: 
  - Is required
- Object attribute:
  - start
  - end
###### **start**
- Description: the starting point of the tickets's selling period
- Type: Date
- Constaint: 
  - Is required
###### **end**
- Description: the ending point of the tickets's selling period
- Type: Date
- Constaint: 
  - Is required
##### **select_time**
- Description: List of selected time (format: 00:00 - 23:59) where the activities could start
- Type: Array of String 
- Constaint: 
  - Is required 
  - String format: 00:00 - 23:59
##### **ticket_type**
- Description: types of tickets
- Type: array of Object
- Constaint: 
  - Is required 
###### **name**
- Description: ticket type's name
- Type: String 
- Constaint: 
  - Is required 
###### **people_per_ticket**
- Description: Number of people that a ticket cover
- Type: Number 
- Constaint: 
  - Is required 
  - Min: 1,
  - default: 1,
###### **price**
- Description: Price of a ticket
- Type: Number 
- Constaint: 
  - Is required 
  - Greater than 0
