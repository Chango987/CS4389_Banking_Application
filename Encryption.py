from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import serialization, hashes

def generate_rsa_keys():
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
    )
    public_key = private_key.public_key()

    # Serialize the keys
    pem_private = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.TraditionalOpenSSL
    ).decode('utf-8')

    pem_public = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    ).decode('utf-8')

    return pem_private, pem_public


def encrypt_transaction_id(transaction_id, public_key):
    public_key_object = serialization.load_pem_public_key(public_key.encode())
    encrypted_transaction_id = public_key_object.encrypt(
        transaction_id.encode(),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    return encrypted_transaction_id

def decrypt_transaction_id(encrypted_transaction_id, private_key):
    private_key_object = serialization.load_pem_private_key(private_key.encode(), password=None)
    decrypted_transaction_id = private_key_object.decrypt(
        encrypted_transaction_id,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    return decrypted_transaction_id.decode()
