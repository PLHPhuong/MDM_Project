# actDetailSchema 
## Structure:
```
actDetailSchema
├── {1} pick_up_included
├── {2} description
├── {3} [included]
├── {4} [not_included]
├── {5} [accessibility]
├── {6} [health_safety]
├── {7} [languages]
├── {8} additional_information
├── {9} location_departure
├── {10} location_end
├── {11} [itinerary_stops]
│ ├── {11.1} name
│ ├── {11.2} admission_ticket
│ ├── {11.3} description
│ ├── {11.4} duration
├── {12} available
│ ├── {12.1} start
│ ├── {12.2} end
├── {13} ticket
│ ├── {13.1} [select_time]
│ ├── {13.2} [ticket_type]
│ │ ├── {13.2.1} name
│ │ ├── {13.2.2} people_per_ticket
│ │ ├── {13.2.3} price
```
## Explain:
#### **1. pick_up_included**
- Description: Do the provider pick up the customer or not 
- Type: Boolean
- Default: true
#### **2. description**
- Description: a full description of these activities
- Type: String
- Constaint: 
   - Is required
#### **3. included**
- Description: what services are included in these activities ?
- Type: array of String
#### **4. not_included**
- Description: what services are not included in these activities ?
- Type: array of String
#### **5. accessibility**
- Description:  some other accessibility service the the provider can provide
- Type: array of String
#### **6. health_safety**
- Description: measures and protocols implemented by the activities/tour providers to ensure the well-being and safety of their customers (in some context, they also give a vague description like "Suitable for all fitness levels" to emphasize the activities/tour is suitable for everybody)
- Type: array of String
#### **7. languages**
- Description: languages spoken by guide
- Type: array of String
- Constaint: 
  - Is required
#### **8. additional_information**
- Description: supplementary details or specific information like Requirements, Cancellation Policy, Important Notices, Contact Information, ....
- Type: String
#### **9. location_departure**
- Description: The meeting/pick_up location
- Type: String
- Constaint: 
  - Is required
#### **10. location_end**
- Description: The location that the provider will drop up off
- Type: String
#### **11. itinerary_stops**
- Description: stops during the trip and their information
- Type: array of Object
- Constaint: 
  - Is required
- Object attribute:
  - name
  - admission_ticket
  - description
  - duration
###### **11.1 name**
- Description: stop's name or location
- Type: String
- Constaint: 
  - Is required
###### **11.2 admission_ticket**
- Description: Whether the prodiver provide admission ticket
- Type: Boolean
- Default: False
###### **11.3 description**
- Description: Description of what activities customer will have 
- Type: String
- Constaint: 
  - Is required
###### **11.4 duration**
- Description: How long will customer will send at the stop (minute)
- Type: Number
- Constaint: 
  - Is required
#### **12. available**
- Description: tickets's selling period / available period
- Type: array of Object
- Constaint: 
  - Is required
- Object attribute:
  - start
  - end
###### **12.1 start**
- Description: the starting point of the tickets's selling period
- Type: Date
- Constaint: 
  - Is required
###### **12.2 end**
- Description: the ending point of the tickets's selling period
- Type: Date
- Constaint: 
  - Is required
#### **13. ticket**
- Description: Some of ticket description
- Type: Object
- Constaint: 
  - Is required
- Object attribute:
  - select_time
  - people_per_ticket
  - price
##### **13.1 select_time**
- Description: List of selected time (format: 00:00 - 23:59) where the activities could start
- Type: Array of String 
- Constaint: 
  - Is required 
  - String format: 00:00 - 23:59
##### **13.2 ticket_type**
- Description: types of tickets
- Type: array of Object
- Constaint: 
  - Is required 
###### **13.2.1 name**
- Description: ticket type's name
- Type: String 
- Constaint: 
  - Is required 
###### **13.2.2 people_per_ticket**
- Description: Number of people that a ticket cover
- Type: Number 
- Constaint: 
  - Is required 
  - Min: 1,
  - default: 1,
###### **13.2.3 price**
- Description: Price of a ticket
- Type: Number 
- Constaint: 
  - Is required 
  - Greater than 0
