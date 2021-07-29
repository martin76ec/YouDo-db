# YouDo - Database

## Usage

``` js
const setupDatabase = require('youdo-db')

setupDatabase(config).then(db => {
  const  {Agent, Metric} = db
}).catch(err => console.error(error))
```
