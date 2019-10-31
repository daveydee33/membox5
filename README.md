# MemBox (membox5)
A fullstack javascript application

# Getting Started
* copy `.env.example` to `.env`, and set the required values
* start app
  * `npm run dev` for Development
  * `npm start` for Production

# API Routes
* /items
  * GET - get ALL items
  * POST - create one item

# ToDO
- [] User accounts
- [] Authentication
- [] Add auth required to routes
- [] Edit functionality with auth check
- [] Make items public or private

# Bugs to Fix
- item delete returns 'Server Error' instead of Not found.  The catch is called if the req.params.id is not an ObjectID, eg. 'zzz'