from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, UserOut, Token
from app.services.auth_service import (
    hash_password, verify_password, create_access_token, get_current_user)

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=UserOut, status_code=201)
def register(data: UserCreate, db: Session = Depends(get_db)):
    email = data.email.lower()
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Email already registered")
    user = User(name=data.name, email=email,
                password_hash=hash_password(data.password), role="user")
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.post("/login", response_model=Token)
def login(data: UserLogin, db: Session = Depends(get_db)):
    email = data.email or data.username
    if not email:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Email or username is required")
    user = db.query(User).filter(User.email == email.lower()).first()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Incorrect email or password")
    return Token(access_token=create_access_token(user.id), role=user.role)

@router.post("/token", response_model=Token, include_in_schema=True)
def token_for_swagger(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Used by Swagger UI OAuth2 authorization popup
    user = db.query(User).filter(User.email == form.username.lower()).first()
    if not user or not verify_password(form.password, user.password_hash):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Incorrect email or password")
    return Token(access_token=create_access_token(user.id), role=user.role)

@router.get("/me", response_model=UserOut)
def me(current_user: User = Depends(get_current_user)):
    return current_user

