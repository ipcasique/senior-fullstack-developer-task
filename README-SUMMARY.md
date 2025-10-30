## Brief explanation

### Backend
- Added migration scripts managing user roles and statuses
- Updated users entity TypeORM for roles and statuses
- Updated Auth guard to handle exceptions properly 

### Frontend
#### Navbar
- Logout handler moved to navbar
- Login button in case of unauthenticated state
- Menu items as an array and visible based on the user roles 

#### State
- Added state management for user
- Error/loading status 

#### Routes
- Routes updated according to the roles
- Added default path redirect

#### Misc
- Added ability to specify a target path as param
- Login button disabled during request


## Suggestions

- No rate limit
- No password, no sessions, no validation
- No tests
- 
- Too small code base to make useful assumptions  

## Misc
- Due to lack of Vue knowledge, I spent more than 2 hours (about 5 in total)
- I used Google and Stackoverflow only