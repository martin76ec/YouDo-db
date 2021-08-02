# YouDo - Database

## Usage

``` js
const setupDatabase = require('youdo-db')

setupDatabase(config).then(database => {
  const  {Account, User, SharedTask, Task} = database
}).catch(err => console.error(error))
```