from sqlalchemy import Column, Integer, String
from .database import Base

class ApiKeyConfig(Base):
    __tablename__ = "api_keys"

    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String, unique=True, index=True)
    key_value = Column(String)
