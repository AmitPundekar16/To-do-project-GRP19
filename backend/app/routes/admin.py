from typing import List, Literal, Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.models.task import Task
from app.schemas.user import UserOut
from app.schemas.task import TaskOut
from app.services.auth_service import require_admin

router = APIRouter(prefix="/admin", tags=["Admin"])

class RoleUpdate(BaseModel):
    role: Literal["user", "admin"]

@router.get("/users", response_model=List[UserOut])
def list_users(db: Session = Depends(get_db), admin: User = Depends(require_admin)):
    return db.query(User).order_by(User.id).all()

@router.get("/tasks", response_model=List[TaskOut])
def list_all_tasks(user_id: Optional[int] = None, db: Session = Depends(get_db),
                   admin: User = Depends(require_admin)):
    query = db.query(Task)
    if user_id:
        query = query.filter(Task.user_id == user_id)
    return query.order_by(Task.created_at.desc()).all()

@router.put("/users/{user_id}/role", response_model=UserOut)
def change_role(user_id: int, data: RoleUpdate, db: Session = Depends(get_db),
                admin: User = Depends(require_admin)):
    if user_id == admin.id:
        raise HTTPException(400, "You cannot change your own role")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(404, "User not found")
    user.role = data.role
    db.commit()
    db.refresh(user)
    return user

@router.delete("/users/{user_id}", status_code=204)
def delete_user(user_id: int, db: Session = Depends(get_db),
                admin: User = Depends(require_admin)):
    if user_id == admin.id:
        raise HTTPException(400, "You cannot delete yourself")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(404, "User not found")
    db.delete(user)   # their tasks are deleted too (cascade)
    db.commit()

@router.get("/stats")
def stats(db: Session = Depends(get_db), admin: User = Depends(require_admin)):
    total_tasks = db.query(func.count(Task.id)).scalar() or 0
    completed = db.query(func.count(Task.id)).filter(Task.status == "completed").scalar() or 0
    total_users = db.query(func.count(User.id)).filter(User.role == "user").scalar() or 0
    total_admins = db.query(func.count(User.id)).filter(User.role == "admin").scalar() or 0
    return {
        "total_registered_users": total_users + total_admins,
        "total_users": total_users,
        "total_admins": total_admins,
        "total_tasks": total_tasks,
        "completed_tasks": completed,
        "pending_tasks": max(0, total_tasks - completed),
    }
