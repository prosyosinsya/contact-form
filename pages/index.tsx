import Head from 'next/head'
import { Inter } from '@next/font/google' 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import React, { useRef } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let data = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      message: messageRef.current?.value,
    }

    await fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <div className="container">
      <h2>Next.js Gmailアプリ</h2>
      <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <Form.Group className="mb-3">
          <Form.Label>お名前</Form.Label>
          <Form.Control type="text" placeholder="name" required ref={nameRef} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>メールアドレス</Form.Label>
          <Form.Control type="email" placeholder="email" id='email' required ref={emailRef} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>メッセージ</Form.Label>
          <textarea 
            name="message" 
            id="message" 
            className='form-control' 
            placeholder='messge'
            required
            ref={messageRef}
          ></textarea>
        </Form.Group>

        <Button variant="primary" type="submit" className='btn btn-danger'>
          メール送信
        </Button>
      </Form>
    </div>
    </>
  )
}
