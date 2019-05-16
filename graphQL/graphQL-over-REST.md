### REST
- representational state transfer
- bespoke, particular resources for each route
  - `GET /api/posts` should return all the posts
- conceptually, RESTful requests treat data as a tree, whose base resource is the starting node.
  - e.g., `user -> user's post -> post's comments -> ...`

### GraphQL
- query language for APIs that allows the client to specify _exactly_ what data they want in a declarative way.
- low-powered mobile devices were a main driver for Facebook developing GraphQL
- it _isn't_ a database, replacement to SQL, or some new ORM, nor is it a REST replacement; both can exist together.
- conceptually, GraphQL treats the data being requested as different nodes of a graph, not as a tree with a base resource.
  - this isn't to change how the data is stored, but only how it's thought about by GraphQL.
- example and corresponding JSON:

GraphQL:
```
query {
  user {
    name
    age
  }
}
```
JSON:
```
{
  "user": {
    "name": "Johnathan Joestar",
    "age": 27
   }
}
```
### Case for GraphQL over REST
##### Underfetching, overfetching, and slowing FE development time
- consider the REST route for getting posts, `GET api/posts/:id`. What if we want to get the author, too?
  - three options:
    - `GET /api/post/:id` gets the authors from another resource
      - problem: requires two requests, which will scale inefficiently
      - keyword: undefetching
    - `GET /api/posts`, but have it also return the author data alongside the posts
      - problem: sometimes you don't want te authors, but now you have them: scales inefficiently because there's now unnecessary data.
      - keyword: overfetching
    - `GET /api/postsWithAuthor` to do the above, but as a new route
      - problem: requires the backend to write a new route, potentially slowing down frontend development
      - problem: breaks RESTful convention of `/resource/:identifier`, where the resource should be a standalone resource. It makes the atomic resource into a complex one.
  -  GraphQL fix: just add `author` to the request when needed

### Misc
- there's an IDE! I've read it does something fancy with the "self-documenting" nature of GraphQL. Who knows what that means.

### Resources
- [excellent intro to difference between REST/GraphQL](https://www.imaginarycloud.com/blog/graphql-vs-rest/)
- [Grider's course on GraphQL](https://www.udemy.com/graphql-with-react-course/)
