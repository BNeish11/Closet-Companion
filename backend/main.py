from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from sqlalchemy.orm import Session
from . import models, schemas
from .database import SessionLocal, init_db
import uvicorn
import os

app = FastAPI(title='Closet Companion Backend')

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv('FRONTEND_ORIGIN', '*')],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.on_event('startup')
def on_startup():
    init_db()


@app.get('/health')
def health():
    return {'status': 'ok'}


@app.get('/items', response_model=List[schemas.ItemOut])
def list_items(skip: int = 0, limit: int = 100):
    db: Session = SessionLocal()
    items = db.query(models.Item).offset(skip).limit(limit).all()
    return items


@app.post('/items')
def upsert_items(items: List[schemas.ItemCreate]):
    db: Session = SessionLocal()
    for it in items:
        existing = db.query(models.Item).filter(models.Item.id == it.id).first()
        if existing:
            for k, v in it.dict().items():
                setattr(existing, k, v)
        else:
            obj = models.Item(**{k: (v if not isinstance(v, list) else json_list(v)) for k, v in it.dict().items()})
            db.add(obj)
    db.commit()
    return {'status': 'ok', 'count': len(items)}


def json_list(lst):
    # helper to store list as JSON string
    import json

    if lst is None:
        return None
    return json.dumps(lst)


@app.post('/feedback')
def create_feedback(fb: schemas.FeedbackCreate):
    db: Session = SessionLocal()
    obj = models.Feedback(**{k: (v if not isinstance(v, list) else json_list(v)) for k, v in fb.dict().items()})
    db.add(obj)
    db.commit()
    return {'status': 'ok'}


@app.get('/models/latest')
def models_latest():
    # placeholder: in a full system this would return signed model metadata or binary
    return {'version': 'none', 'note': 'Model updates not configured'}


if __name__ == '__main__':
    uvicorn.run('backend.main:app', host='127.0.0.1', port=8000, reload=True)
