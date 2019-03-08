$M.subscribe(function(getStore) {
  console.log(getStore());
});

/*

Grouping
-----------------------------------

Use the modela attribute to add fields to groups to ease fetching fields for e.g submiting to server
Group names should be lowercase annd optionnally with a number e.g form1
A field can be can be added to multiple groups e.g form1:form2

Fetching state with groups
-----------------------------------



Transforms
-----------------------------------

Register transform functions or use builtin ones to change state value when fetching them
Transforms can return any datatype, transforms that cannot work on a given value should return null.

Transform names should be camelCased with only alphabets

Datatypes allowed for return include
- Array
- Object Literal : obj.constructor === Object
- String
- Integer
- Float
Otherwise should return null

Builtin transforms
-----------------------------------

Already defined transforms that can be used on the fly. Below is the implemented transforms with expected return value
of which on any issue, they return null

integer  (int)
float    (float)


Register custom transforms
-----------------------------------

This makes modelaUI be aware of these transform and they cann be used by passing their names next to field to transform

ModelaUI.transforms({
  name: newfunc
});


Set default fields transforms
-----------------------------------

This are transform of which if provided will be applied dirrectly on fields on any fetch. Note that these transform should
either be registered transforms or builtin transforms

ModelaUI.setTransforms({
  field: registered|builtin
});

Chaining tranforms on a field
-----------------------------------

This help with the reusabilty of transforms

ModelaUI.getState([
  'firstname|title|naira',
  'gender|integer',
  'lastname',
]);

Getting states with group name
-----------------------------------

When doing this, we also need to consider tranforms for fields in the group


Checking if primitive i.e string, numbers annd boolean

Setting state to true
*/
