from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .database import engine
from .api import router as api_router

# Tạo các bảng trong DB
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="TikTok Affiliate Video Builder API")

# Cấu hình CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Trong production nên set specific domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/config", tags=["config"])

@app.get("/")
def root():
    return {"message": "Welcome to TikTok Affiliate Video Builder API"}
