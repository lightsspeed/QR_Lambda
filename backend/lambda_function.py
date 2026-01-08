import json
import base64
import qrcode
from io import BytesIO

def lambda_handler(event, context):
    """
    AWS Lambda handler for QR code generation
    """
    try:
        # Parse request body
        body = json.loads(event.get('body', '{}'))
        data = body.get('data', '')
        if not data:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'No data provided for QR code generation'})
            }
        # Generate QR code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.ERROR_CORRECT_L, 
            box_size=10,
            border=4,
        )
        qr.add_data(data)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")
        # Convert image to base64
        buffered = BytesIO()
        img.save(buffered, "PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
        # Return response
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'qr_code': img_str,
                'message': 'QR code generated successfully'
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

