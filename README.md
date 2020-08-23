# Utility Functions and HOC Guard

### Motivation

Just a little library that provides some useful functions and a cool data guard pattern HOC.

### Guard Pattern

```ts

import { createGuard } from 'frr-util/lib/guards'

type UserGuardedProps = { user: { name: string } }

// userAsOptionSelector is selector that selects Option<{ user: { name: string } }> from the redux store
const userGuard = createGuard<UserGuardedProps>(userAsOptionSelector)

const Page = (props: UserGuardedProps) => {
  return (
    <div>
      {props.user.name}
    </div>
  )
}


const Guarded = userGuard(Page)

export { Guarded as Page } 

```
