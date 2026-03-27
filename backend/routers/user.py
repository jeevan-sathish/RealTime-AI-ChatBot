from fastapi import APIRouter

router =APIRouter()

@router.get('/')
def greet():
    return {
        "message":"hello from router/user"
    }