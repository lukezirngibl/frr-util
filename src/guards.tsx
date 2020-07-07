import * as React from 'react'
import { useSelector } from 'react-redux'
import { sequenceS } from 'fp-ts/lib/Apply'
import { option, Option } from 'fp-ts/lib/Option'
import { OutputSelector } from 'reselect'

export const createGuard = <T extends {}>(
  selector: OutputSelector<any, Option<T>, (res: any) => Option<T>>,
) => <E extends T>(Comp: React.FC<E>) => {
  const Guard: React.FC<Omit<E, keyof T>> = props => {
    const guarded = useSelector(selector)
    return sequenceS(option)({ guarded }).fold(<></>, guardedProps => {
      return <Comp {...((props as unknown) as E)} {...guardedProps.guarded} />
    })
  }

  return Guard
}
