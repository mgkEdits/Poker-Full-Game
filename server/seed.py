from app import app;
from models import db, GameRecord

with app.app_context():
    GameRecord.query.delete()

    game_records =[
        GameRecord(game_id="1", user_id="1", result="0"),
        GameRecord(game_id="2", user_id="1", result="1"),
        GameRecord(game_id="3", user_id="2", result="0"),
        GameRecord(game_id="4", user_id="3", result="1"),
        GameRecord(game_id="5", user_id="3", result="1"),
        GameRecord(game_id="6", user_id="3", result="0"),
        GameRecord(game_id="7", user_id="4", result="0"),
        GameRecord(game_id="8", user_id="4", result="1"),
        GameRecord(game_id="9", user_id="6", result="1"),
        GameRecord(game_id="10", user_id="5", result="1"),
        GameRecord(game_id="11", user_id="5", result="0"),
    ]

    db.session.bulk_save_objects(game_records)
    db.session.commit()