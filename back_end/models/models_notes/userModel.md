# userSchema 
## Structure:
```
userSchema
├── {1} name
├── {2} email
├── {3} password
├── {4} avatar
```
## Explain:
#### **1. name**
- Description: account's name
- Type: String
- Default: is email (before '@')
#### **2. email**
- Description: account's email
- Type: String
- Constaint: 
  - Is required
  - Is unique
  - will be lowercase
  - has email format
#### **3. password**
- Description: account password
- Type: String
- Constaint: 
  - Is required
#### **4. avatar**
- Description: account's avatar
- Type: String

