from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app import models  # imports User and Task so their tables get created
from app.routes import auth, tasks, admin, ai

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="To-Do App API",
    description="Backend API with JWT Auth, Role Verification (User/Admin), and Task Management.",
    version="1.0.0"
)

# Allow requests from common frontend dev servers
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes with /api prefix (for frontend REST APIs)
app.include_router(auth.router, prefix="/api")
app.include_router(tasks.router, prefix="/api")
app.include_router(admin.router, prefix="/api")
app.include_router(ai.router, prefix="/api")

# Also register without /api prefix for convenience and Swagger OAuth2 redirects
app.include_router(auth.router)
app.include_router(tasks.router)
app.include_router(admin.router)
app.include_router(ai.router)

@app.get("/")
def root():
    return {"message": "To-Do API is running", "docs": "/docs"}
