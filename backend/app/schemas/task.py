from datetime import date, datetime
from typing import Literal, Optional
from pydantic import BaseModel, Field

Status = Literal["pending", "completed"]
Priority = Literal["low", "medium", "high"]

class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: Optional[str] = None
    priority: Priority = "medium"
    due_date: Optional[date] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=200)
    description: Optional[str] = None
    status: Optional[Status] = None
    priority: Optional[Priority] = None
    due_date: Optional[date] = None

class TaskStatusUpdate(BaseModel):
    status: Status


class TaskOut(BaseModel):
    id: int
    user_id: int
    title: str
    description: Optional[str]
    status: str
    priority: str
    due_date: Optional[date]
    created_at: datetime
    model_config = {"from_attributes": True}