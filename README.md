# Doctor System

A full-stack doctor appointment booking system. Users can browse doctors and departments and book appointments, while admins can manage doctors and departments. Authentication supports email/password as well as OAuth login via GitHub and Google.

> **Note:** Some details below (exact env variable names for OAuth, npm scripts, server middleware setup) are inferred from the code shared during development. Double-check them against your actual `package.json` / entry files and adjust if needed.

---

## Tech Stack

### Backend
- **Node.js / Express.js** — REST API server (ES Modules)
- **MongoDB / Mongoose** — database & ODM
- **express-session + connect-mongodb-session** — session-based authentication (session stored in MongoDB)
- **Passport.js** — `local`, `github`, and `google` strategies for authentication
- **express-validator** — request validation
- **Multer** — image upload handling (doctors & departments)
- **Nodemailer** — sending password-reset emails
- **bcryptjs** — password hashing
- **swagger-ui-express + yamljs** — interactive API documentation (`/api-docs`)

### Frontend
- **React** (Vite)
- **React Context API** — global state (authenticated user)
- **TanStack Query (React Query)** — server-state management / data fetching, caching, and mutations
- **Axios** — HTTP client (`src/api/axiosGlobal.js`)
- **React Router** — routing, with custom route guards for protected/auth-only pages
- **Form validation schemas** (`src/constants/schemas`) — mirror the backend's `express-validator` rules
- **shadcn/ui-style components** (`src/components/ui`) — Button, Input, Dialog, Dropdown, Carousel, etc.

---

## Project Structure

### Backend

```
backend/
├── config/
│   ├── swagger/
│   │   ├── swagger.js        # Swagger UI setup (loads swagger.yml)
│   │   └── swagger.yml       # OpenAPI spec
│   ├── passport.js           # Passport strategies (local, github, google)
│   └── multer.js             # Multer config for image uploads
├── controllers/
│   ├── userController.js     # register, login, logout, OAuth callbacks, getMe
│   ├── passwordController.js # verifyEmail, resetPassword
│   ├── doctorController.js   # addDoctor, getAllDoctors, getDoctorById
│   ├── appointmentController.js
│   └── departmentController.js
├── middlewares/
│   ├── verifyToken.js        # checks the user has an active session
│   ├── checkRole.js          # restricts routes to admin users
│   └── CheckValidation.js    # runs express-validator and formats errors
├── models/
│   ├── UserSchema.js
│   ├── DoctorSchema.js
│   ├── AppointmentSchema.js
│   └── DepartmentSchema.js
├── routes/
│   ├── userRouter.js
│   ├── passwordRouter.js
│   ├── doctorRouter.js
│   ├── appointmentRouter.js
│   └── departmentRouter.js
├── utlis/
│   ├── validationArr.js      # express-validator rule sets
│   ├── ErrorHandler.js       # async error wrapper
│   ├── resStatus.js          # response status constants (success/failed/error)
│   └── session.js            # generateToken / session helpers
└── app.js / server.js        # Express app entry point
```

### Frontend

```
frontend/
├── src/
│   ├── api/
│   │   └── axiosGlobal.js         # shared Axios instance (base URL, credentials)
│   ├── services/                  # raw API call functions, grouped by feature
│   │   ├── auth/services.js
│   │   ├── password/services.js
│   │   ├── doctors/services.js
│   │   ├── appointments/services.js
│   │   └── departments/services.js
│   ├── hooks/                     # React Query hooks wrapping the services
│   │   ├── auth/ (useLogin, useRegister, useLogout, useGetMe)
│   │   ├── password/ (useVerifyEmail, useResetPassword)
│   │   ├── doctors/ (useGetDoctors, useGetDoctorById, useAddDoctor)
│   │   ├── appointments/ (useAddAppointment, useDeleteAppointment, useGetAllAppointments)
│   │   └── departments/ (useAddDepartment)
│   ├── contextAPI/
│   │   └── UserProvider.jsx       # global auth/user context
│   ├── protectedRoutes/
│   │   ├── ProtectRoute.jsx       # blocks access for unauthenticated users
│   │   ├── InverseProtectRoute.jsx# blocks logged-in users from auth pages (login/register)
│   │   ├── UserRoutes.jsx         # role/user-scoped route guard
│   │   └── LoggedRoutes.jsx       # routes that require an active session
│   ├── pages/
│   │   ├── auth/ (Login, Register, VerfiyEmail, ResetPassword, Callback)
│   │   ├── home/ (Home)
│   │   ├── doctors/ (AllDoctors, OneDoctor, AddDoctor, DoctorCard)
│   │   ├── appointments/ (Appointments, AppointmentCard, ConfirmDelete)
│   │   └── departments/ (AddDepartment)
│   ├── myComponents/               # feature/presentational components (Header, Footer, HomeSlider, DoctorBanner, BookAppointment, AppointmentCard, AuthBtns, MainLayout, SomeDoctors, models/Loading, models/Error)
│   ├── components/ui/              # reusable UI primitives (button, input, dialog, dropdown-menu, carousel)
│   ├── constants/
│   │   ├── schemas/                # form validation schemas (auth, doctor, department, appointment)
│   │   └── data/navLinks.js
│   ├── lib/utils.js
│   ├── assets/                     # images, icons
│   ├── App.jsx
│   └── main.jsx
```

---

## Authentication

Authentication is **session-based**, not JWT-in-header:

- On login/register, `express-session` (backed by `connect-mongodb-session`) creates a session and sets an **httpOnly session cookie** (`connect.sid` by default) on the response.
- Every subsequent request from the frontend must be sent **with credentials** (`axios.defaults.withCredentials = true` / `{ withCredentials: true }`) so the browser attaches the session cookie automatically — this is handled centrally in `src/api/axiosGlobal.js`.
- `middlewares/verifyToken.js` checks the session on protected backend routes.
- `middlewares/checkRole.js` additionally restricts certain routes (adding doctors/departments) to users with `role: "admin"`.
- **OAuth login** (GitHub & Google) is handled via Passport strategies (`config/passport.js`): the user is redirected to the provider, and on callback a session is created the same way as local login, then the browser is redirected to `${FRONTEND_URL}/callback` — handled on the frontend by `src/pages/auth/Callback.jsx`, which typically re-fetches the current user (`useGetMe`) to sync the app's auth state.

---

## API Endpoints & Frontend Implementation

Base URL (dev): `http://localhost:3000` — full interactive docs available at **`/api-docs`** (see `config/swagger/swagger.yml`).

### Users (`/users`)

| Method | Endpoint | Auth | Backend Controller | Frontend Hook | Used In |
|---|---|---|---|---|---|
| POST | `/users/register` | Public | `registerUser` | `useRegister` | `pages/auth/Register.jsx` |
| POST | `/users/login` | Public | `loginUser` | `useLogin` | `pages/auth/Login.jsx` |
| POST | `/users/logout` | Session | `logoutUser` | `useLogout` | `myComponents/authBtns/AuthBtns.jsx` |
| GET | `/users/auth/github` | Public | Passport GitHub strategy | — (redirect) | `myComponents/authBtns/AuthBtns.jsx` |
| GET | `/users/auth/github/callback` | Public | `loginUserWithGithub` | — (redirect) | `pages/auth/Callback.jsx` |
| GET | `/users/auth/google` | Public | Passport Google strategy | — (redirect) | `myComponents/authBtns/AuthBtns.jsx` |
| GET | `/users/auth/google/callback` | Public | `loginUserWithGoogle` | — (redirect) | `pages/auth/Callback.jsx` |
| GET | `/users/me` | Session | `getMe` | `useGetMe` | `contextAPI/UserProvider.jsx` (loaded on app start to hydrate auth state) |

### Password (`/password`)

| Method | Endpoint | Auth | Backend Controller | Frontend Hook | Used In |
|---|---|---|---|---|---|
| POST | `/password/verify-email` | Public | `verifyEmail` | `useVerifyEmail` | `pages/auth/VerfiyEmail.jsx` |
| POST | `/password/reset-password` | Public | `resetPassword` | `useResetPassword` | `pages/auth/ResetPassword.jsx` |

### Doctors (`/doctors`)

| Method | Endpoint | Auth | Backend Controller | Frontend Hook | Used In |
|---|---|---|---|---|---|
| POST | `/doctors/add` | Session + Admin | `addDoctor` | `useAddDoctor` | `pages/doctors/AddDoctor.jsx` |
| GET | `/doctors/all` | Session | `getAllDoctors` | `useGetDoctors` | `pages/doctors/AllDoctors.jsx`, `myComponents/someDoctors/SomeDoctors.jsx` (home page preview) |
| GET | `/doctors/:id` | Session | `getDoctorById` | `useGetDoctorById` | `pages/doctors/OneDoctor.jsx`, `myComponents/doctorBanner/DoctorBanner.jsx` |

### Appointments (`/appointments`)

| Method | Endpoint | Auth | Backend Controller | Frontend Hook | Used In |
|---|---|---|---|---|---|
| POST | `/appointments/create` | Session | `createAppointment` | `useAddAppointment` | `myComponents/bookAppointment/BookAppointment.jsx` |
| GET | `/appointments/all` | Session | `getUserAppointments` | `useGetAllAppointments` | `pages/appointments/Appointments.jsx` |
| DELETE | `/appointments/:id` | Session | `deleteAppointment` | `useDeleteAppointment` | `pages/appointments/ConfirmDelete.jsx` (triggered from `AppointmentCard`) |

### Departments (`/departments`)

| Method | Endpoint | Auth | Backend Controller | Frontend Hook | Used In |
|---|---|---|---|---|---|
| GET | `/departments` | Session + Admin | `getAllDepartments` | — | *(no dedicated frontend hook found — add one if a departments list page is needed)* |
| POST | `/departments/add` | Session + Admin | `addDepartment` | `useAddDepartment` | `pages/departments/AddDepartment.jsx` |

---

## Frontend Data Flow (typical pattern)

Each feature follows the same layered pattern:

1. **`services/<feature>/services.js`** — plain functions that call the backend using the shared `axiosGlobal` instance (e.g. `getAllDoctors()`, `addAppointment(data)`).
2. **`hooks/<feature>/useX.jsx`** — wraps the service call in a TanStack Query `useQuery` (for reads) or `useMutation` (for writes: create/update/delete), handling loading/error/cache states.
3. **Pages / components** — call the hook, and render `myComponents/models/Loading.jsx` or `myComponents/models/Error.jsx` for the respective states, then render the real UI (e.g. `DoctorCard`, `AppointmentCard`) once data resolves.
4. **Form pages** (Register, Login, AddDoctor, AddDepartment, BookAppointment) validate input client-side using the matching schema in `constants/schemas/` before calling the mutation hook — mirroring the backend's `express-validator` rules.

## Route Guards

- **`InverseProtectRoute`** — used for auth pages (Login/Register): redirects *away* if the user is already logged in.
- **`ProtectRoute` / `LoggedRoutes`** — used for pages that require an authenticated session (e.g. booking or viewing appointments): redirects to `/login` if not authenticated.
- **`UserRoutes`** — scopes routes to the logged-in user's own data/role (e.g. admin-only pages like `AddDoctor`/`AddDepartment`).

> These guards read the current user from `contextAPI/UserProvider.jsx`, which is hydrated via `useGetMe` on app load.

---

## Environment Variables

**Backend** (`backend/.env`):
```dotenv
DATABASE_URL=              # MongoDB connection string
SESSION_SECRET=            # express-session secret
EMAIL_USER=                # Gmail address used by Nodemailer
EMAIL_PASS=                # Gmail app password
FRONTEND_URL=               # e.g. http://localhost:5173
BACKEND_URL="http://localhost:3000"
# + GitHub/Google OAuth client ID & secret (see config/passport.js)
```

**Frontend** (`frontend/.env`):
```dotenv
VITE_BACKEND_URL=http://localhost:3000   # used by src/api/axiosGlobal.js
```

---

## Running Locally

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

- Backend API: `http://localhost:3000`
- API Docs (Swagger): `http://localhost:3000/api-docs`
- Frontend: `http://localhost:5173` (default Vite port)

> Adjust ports/scripts above if your `package.json` files differ.