### To dump a table
#### Useful for sharing data while developing
##### To dump a particular table

```
# pg_dump extracts a postgres db into a script or archive file
pg_dump \

# specify host of machine running postgres server (defaults to PGHOST env var)
-h localhost \

# port running TCP/socket for server
-p 5432

# username, require password
-U username -W \

# dump only tables matchig name
--table="table-name" \

# data only, no schema
--data-only \

# dump data as an `insert` command
--column-inserts \
database-name > tabe.sql

```

##### To extract the sent .sql file
```
pg_dump \
-h localhost \
-p 5432 \
-U username \

# name of database to extract to
database-name \

# file to extract from
-f table.sql
```

###### source
[Carlos Becker](https://carlosbecker.com/posts/dump-postgres-table-inserts/)
