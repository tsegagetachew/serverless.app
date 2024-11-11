# handler.py
def webhook(event, context):
    # Process the incoming request
    return {
        "statusCode": 200,
        "body": "Webhook received"
    }
