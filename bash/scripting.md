#### Terminal args
```
$0 - The name of the Bash script.
$1 - $9 - The first 9 arguments to the Bash script. (As mentioned above.)
$# - How many arguments were passed to the Bash script.
$@ - All the arguments supplied to the Bash script.
$? - The exit status of the most recently run process.
$$ - The process ID of the current script.
$USER - The username of the user running the script.
$HOSTNAME - The hostname of the machine the script is running on.
$SECONDS - The number of seconds since the script was started.
$RANDOM - Returns a different random number each time is it referred to.
$LINENO - Returns the current line number in the Bash script.
```
Typing `env` in the terminal will list other variables you can use, too.

#### Setting variables
`variable=value`, where there are no spaces on either side of the `=`.

- May be upper/lower case, but bash is case sensitive
- Refer to a variable with `$`, `$variable`

#### Quotes
- Single quotes treat every character literally
- Double quotes allow you to do substitution (i.e., including variables when setting a value)

```
hello_world='Hello world'
echo $hello_world
new_var="More $hello_world"
echo $new_var
```
