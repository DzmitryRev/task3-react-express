import React, { useState } from 'react';

export default function SignunPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div>Загеристироваться</div>
  );
}
