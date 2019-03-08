# htmod
A template engine which reserves html syntax

## Introducing new tags to templatarize and modularize html

Some inline tags includes
- t+ : to include html files
- t= : to use a declared variable
- t$ : to declare a variable within template file
- t& : to include external environment javascript file

Some block tags includes
- t*  : to do a loop
- t%  : to declare conditionals
- t!% : to complement t% to add more conditionals





/*
|--------------------------------------------------------------------------
| Argument Processing Class
|--------------------------------------------------------------------------
|
| This class was created to process attributes of custom tags, to check for
| syntax and type errors.
| 
| It has a .process method which contains the logic for the processing,
| though it uses some other methods declared in the class to perform its own
| operations.
| 
| Instance variables has been created to be used by the process method, and
| they are always reset back to default on every call to the .process method.
|
*/

/*
|--------------------------------------------------------------------------
| String processing logic
|--------------------------------------------------------------------------
|
| Character read after an encounter with the string opening quote are
| considered as the characters for the string, characters such as spaces and
| opening string quote sibling quote are both ignored.
|
| Upon meeting the opening string quote, the {quote} attribute of the string
| object is set to the opening quote with meaning that the system has started
| reading string contents. Also, the {stdin} attribute is set to empty string. 
| 
| If a quote character which is the same as the opening quote character is met,
| an error is set as such quotes are not allowed within the string in question. 
|
*/

/*
|--------------------------------------------------------------------------
| Range processing logic
|--------------------------------------------------------------------------
|
| Character read after an encounter with the character {|} are
| considered as the characters for the range and are read into the {stdin}
| attribute of the range object.
| 
| After opening a range declarations, two characters are considered breaking
| points, namely {|} and {,}.
| 
| Once one of these breaking point characters is met, what has been read into
| the {stdin} attribute is expected to be an integer, otherwise an error will
| be set.
| 
| Whether the first operand is bigger that the second is a loose constraint
| which will be used to determine whether the order of loop will be descending or
| ascending.
|
*/

/*
|--------------------------------------------------------------------------
| Syntax Check
|--------------------------------------------------------------------------
| 
| It does not really do syntax check at this stage, just token check, that
| is to be sure that tokens are of defined types which includes but not
| limited to { variable | string | range | operator }
|
| Actually syntax check is expected to be done when interpreting arguments.
|
*/



/*
|--------------------------------------------------------------------------
| HTML Intermediate Representation Class
|--------------------------------------------------------------------------
|
| This class was created to process an html content and return an
| intermediate representation array to be passed on to the next parser module
| for further processing.
|
| It has a process method that kick starts the processing of the html content.
| It has an init method to validate and update the {html} object attribute
| 
*/



/*
|--------------------------------------------------------------------------
| Compiler
|--------------------------------------------------------------------------
|
| To read internal representation from parser and return an object
| Context should be specified for resolving variables and path
| 
*/