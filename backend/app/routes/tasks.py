from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, Response
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.task import Task
from app.models.user import User
from app.schemas.task import TaskCreate, TaskUpdate, TaskStatusUpdate, TaskOut, Status
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/tasks", tags=["Tasks"])

def get_own_task(task_id: int, db: Session, user: User) -> Task:
    # looks up the task only among THIS user's tasks
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == user.id).first()
    if not task:
        raise HTTPException(404, "Task not found")
    return task

@router.post("", response_model=TaskOut, status_code=201)
def create_task(data: TaskCreate, db: Session = Depends(get_db),
                current_user: User = Depends(get_current_user)):
    task = Task(**data.model_dump(), user_id=current_user.id)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

@router.get("", response_model=List[TaskOut])
def list_tasks(status_filter: Optional[Status] = Query(None, alias="status"),
               db: Session = Depends(get_db),
               current_user: User = Depends(get_current_user)):
    query = db.query(Task).filter(Task.user_id == current_user.id)
    if status_filter:
        query = query.filter(Task.status == status_filter)
    return query.order_by(Task.created_at.desc()).all()

@router.get("/{task_id}", response_model=TaskOut)
def get_task(task_id: int, db: Session = Depends(get_db),
             current_user: User = Depends(get_current_user)):
    return get_own_task(task_id, db, current_user)

@router.put("/{task_id}", response_model=TaskOut)
def update_task(task_id: int, data: TaskUpdate, db: Session = Depends(get_db),
                current_user: User = Depends(get_current_user)):
    task = get_own_task(task_id, db, current_user)
    for field, value in data.model_dump(exclude_unset=True).items():
        if value is None and field in ("title", "status", "priority"):
            continue  # these columns can't be empty
        setattr(task, field, value)
    db.commit()
    db.refresh(task)
    return task

@router.patch("/{task_id}/status", response_model=TaskOut)
def update_status(task_id: int, data: TaskStatusUpdate, db: Session = Depends(get_db),
                  current_user: User = Depends(get_current_user)):
    task = get_own_task(task_id, db, current_user)
    task.status = data.status
    db.commit()
    db.refresh(task)
    return task

@router.patch("/{task_id}/complete", response_model=TaskOut)
def complete_task(task_id: int, db: Session = Depends(get_db),
                  current_user: User = Depends(get_current_user)):
    task = get_own_task(task_id, db, current_user)
    task.status = "completed"
    db.commit()
    db.refresh(task)
    return task

@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: int, db: Session = Depends(get_db),
                current_user: User = Depends(get_current_user)):
    task = get_own_task(task_id, db, current_user)
    db.delete(task)
    db.commit()
    return Response(status_code=204)
