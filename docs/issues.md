# Issues

## cannot index params[key]

when trying to reference params:Params with a string key following error arises: 

Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Params'. 

No index signature with a parameter of type 'string' was found on type 'Params'.ts(7053)


solution: change tsconfig.json

    "noImplicitAny": false

## Issue 2
