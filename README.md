# 🔐 Encrypted Key Storage for Secure Messaging

This project implements a secure system for generating and storing public-private key pairs using [libsodium](https://github.com/jedisct1/libsodium) via `libsodium-wrappers`. The private key is encrypted with a password-derived key before being stored in `localStorage`, enhancing security for end-to-end encrypted messaging apps.

---

## 📦 Features

- Generates a Curve25519 key pair using `crypto_box_keypair`
- Encrypts the private key using `crypto_secretbox_easy` (XSalsa20-Poly1305)
- Stores:
  - Encrypted `publicKey`
  - Encrypted `privateKey`
- Decrypts and restores key pair securely when needed

---
