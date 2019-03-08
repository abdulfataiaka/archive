# Modela
A javascript library for handling page data built with jQuery library


#### Optimization

```javascript

// Listen for changes in the store
$M.subscribe(function(){});

// Register and set default transposers
$M.bindTransposers({});

// setters
$M.setState({ lastname: '' });
$M.setState(prevState => {object});

// getters
$M.state(['lastname'], true);
$M.state('username', false);
$M.group('user', false);

```

Only update UI when value of a field has changed.

#### To do

- Refactor codebase to use optimized logics

- applying transform for specific fields when fetching these specific fields : Array
- applying transform on specific fields for group fetching : by Group

- Remove jQuery dependency from codebase

- Setup testing framework
- Test all implementations

- create webpack development config
- create webpack production config

- setup pivotal tracker for project
- setup Travis CI for running test

- Make available version 1.0.0 for usage in production

#### Important

We might wannt to ensure that exact data type gotten from UI or setter functions is whats stored and not converted to strings

We might want to consider changing state fields value to object, to accomodate immediately accessible data on change of UI for node such as Images, audios etc, to make preview easy.

Handling validations of nodes

#### Consideration

All store data are strings, as it is expected that values should come from UI, so users should know that values gotten will be strings.
Do not border about how data gets to the server, just make it easy for data to be collated on client side
Transformation on change can affect perfomance, maybe it should be done on submit or other times
Consider update the store for asyncronous actions.
Consider temporary page storage with localStorage for applicationn persistence.
Consider initializing store using server from different sources such as localStorage or server
Users should be able to create a custom element node class that states how its value should be updated and gotten
Should be able to fetch state inn different format, such as FormData, JSON, Object(`default`)


#### Notes

Listen for changes on UI

Input
Textarea
Button
Select
File : Image, Video, Audio (Previews)
