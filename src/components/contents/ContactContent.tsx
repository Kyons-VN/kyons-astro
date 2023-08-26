import { activeMenu } from '@app/app';
import Footer from '@components/Footer';
import { useStore } from '@nanostores/preact';
import { useState } from 'preact/hooks';

type Props = {
  l: any;
};

export function ContactContent({ l }: Props, state: any) {
  const [sended, setSended] = useState(0);
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event: any) {
    event.preventDefault();
    setSended(1);
    preventScroll(true);

    const htmlMessage = message.replace(/\n/g, '<br />');
    // const url = `http://127.0.0.1:5001/kyonsvn/us-central1/smtpMail?type=${type}&email=${email}&name=${name}&message=${htmlMessage}`
    const url = `https://us-central1-kyonsvn.cloudfunctions.net/smtpMail?type=${type}&email=${email}&name=${name}&message=${htmlMessage}`;

    fetch(encodeURI(url))
      // .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setTimeout(() => {
        //   setSended(0);
        //   preventScroll(false);
        // }, 5000);
        clearInput();
        setSended(data.status == 200 ? 2 : 3);
      })
      .catch((err) => {
        clearInput();
        setSended(3);
      });
  }

  function preventScroll(isTrue: boolean) {
    document.body.className = isTrue ? 'overflow-hidden' : '';
    const nav = document.getElementById('menu');
    nav!.className = isTrue ? 'menu z-0' : 'menu';
  }

  function clearInput() {
    setEmail('');
    setType('');
    setName('');
    setMessage('');
  }

  const $activeMenu = useStore(activeMenu);

  return (
    <div class='flex flex-col w-full h-screen'>
      <div id='contact' class='absolute mt-[-56px]'></div>
      <div class='flex-1 flex flex-col gap-6 items-center justify-center p-6 bg-contact'>
        <div class='w-full flex flex-col gap-6 items-center'>
          <h5
            class='text-orange custom-transition'
            style={$activeMenu != 4 ? 'opacity: 0;transform: translateY(80px);' : ''}
          >
            {l.contact.contact}
          </h5>
          <span
            class='text-center custom-transition delay-1'
            style={$activeMenu != 4 ? 'opacity: 0;transform: translateY(80px);' : ''}
          >
            {l.contact.contactDesc}
          </span>
        </div>
        <form id='form' onSubmit={handleSubmit} class='w-full md:w-[600px] flex flex-col gap-6'>
          <div class='flex flex-col gap-2'>
            <select
              class='control custom-transition delay-2'
              style={$activeMenu != 4 ? 'opacity: 0;transform: translateY(80px);' : ''}
              name='type'
              id=''
              required
              value={type}
              onChange={(event: any) => setType(event.target.value)}
            >
              <option value='' disabled selected hidden>
                {l.contact.youAre}
              </option>
              <option value={l.contact.parents}>{l.contact.parents}</option>
              <option value={l.contact.teachers}>{l.contact.teachers}</option>
              <option value={l.contact.educators}>{l.contact.educators}</option>
              <option value={l.contact.investors}>{l.contact.investors}</option>
              <option value={l.contact.presses}>{l.contact.presses}</option>
              <option value={l.contact.potentialTeamates}>{l.contact.potentialTeamates}</option>
            </select>
            <input
              name='email'
              type='text'
              placeholder={l.contact.email}
              required
              value={email}
              onChange={(event: any) => setEmail(event.target.value)}
              class='custom-transition delay-3'
              style={$activeMenu != 4 ? 'opacity: 0;transform: translateY(80px);' : ''}
            />
            <input
              name='name'
              type='text'
              placeholder={l.contact.name}
              value={name}
              onChange={(event: any) => setName(event.target.value)}
              class='custom-transition delay-4'
              style={$activeMenu != 4 ? 'opacity: 0;transform: translateY(80px);' : ''}
            />
            <textarea
              name='message'
              type='text'
              placeholder={l.contact.message}
              required
              value={message}
              onChange={(event: any) => setMessage(event.target.value)}
              rows={3}
              class='custom-transition delay-5'
              style={$activeMenu != 4 ? 'opacity: 0;transform: translateY(80px);' : ''}
            ></textarea>
          </div>
          <div
            className={
              sended != 0
                ? 'flex flex-col items-center justify-center fixed z-30 top-0 left-0 w-screen h-screen bg-black bg-opacity-80'
                : 'hidden'
            }
          >
            {(sended == 2 || sended == 3) && (
              <div class='w-[333px] bg-white p-8 rounded-lg'>
                {sended == 2 ? (
                  <>
                    <div class='flex flex-col'>
                      <strong>{l.contact.thankYou}</strong>
                      <div class='h-2'></div>
                      <span>{l.contact.success}</span>
                      <div class='h-6'></div>
                      <button
                        type='button'
                        class='btn w-full md:w-auto flex md:inline-block justify-center'
                        onClick={(event: any) => {
                          preventScroll(false);
                          setSended(0);
                        }}
                      >
                        {l.close}
                      </button>
                    </div>
                  </>
                ) : sended == 3 ? (
                  l.contact.error
                ) : null}
              </div>
            )}
            <div class='h-20 md:h-32'></div>
          </div>
          <div
            class='w-full flex justify-center items-center custom-transition delay-6'
            style={$activeMenu != 4 ? 'opacity: 0;transform: translateY(80px);' : ''}
          >
            <button class='btn w-full md:w-auto flex md:inline-block justify-center' type='submit'>
              {l.contact.send}
            </button>
          </div>
        </form>
      </div>
      <Footer l={l} />
    </div>
  );
}
