import sys
from app.database import SessionLocal
from app import models
from app.models.user import User

if len(sys.argv) < 2:
    print("Usage: python make_admin.py <email>")
    sys.exit(1)

email_arg = sys.argv[1].lower().strip()
db = SessionLocal()
try:
    user = db.query(User).filter(User.email == email_arg).first()
    if not user:
        print(f"No user found with email: {email_arg}")
    else:
        user.role = "admin"
        db.commit()
        print(f"Success: {user.email} is now an admin.")
finally:
    db.close()
