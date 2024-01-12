'use client';
import { FunctionComponent, useState } from 'react';

import type { DialogProps } from '@material-tailwind/react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Dialog,
  Input,
  Typography,
} from '@material-tailwind/react';

interface ILoginModal {
  popupOpenState: DialogProps['open'];
  popupStateHandler: DialogProps['handler'];
}

interface ILoginCredentials {
  email: string;
  password: string;
}

interface IAuthorizationResult {
  accessToken?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
  };
  message?: string;
  status: boolean;
}

async function authorize(credentials: ILoginCredentials): Promise<IAuthorizationResult | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL + '/api/v1/login';

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.status) {
      throw new Error(`Authorization failed: ${data.message}`);
    }

    return {
      accessToken: data?.access_token,
      user: data?.user,
      message: data?.message,
      status: data?.status,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Authorization error:', error.message);
    }
    return null;
  }
}

const LoginModal: FunctionComponent<ILoginModal> = ({ popupStateHandler, popupOpenState }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await authorize({ password: password, email: email });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      size="xs"
      open={popupOpenState}
      handler={popupStateHandler}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            Zaloguj
          </Typography>
          <Typography className="mb-3 font-normal" variant="paragraph" color="gray">
            Wprowadź swój adres e-mail i hasło, aby się zalogować.
          </Typography>
          <Typography className="-mb-2" variant="h6">
            Email
          </Typography>
          <Input
            label="Email"
            size="lg"
            crossOrigin={false}
            onChange={(e) => setEmail(e.target.value)}
            className={isLoading ? 'animate-pulse' : ''}
          />
          <Typography className="-mb-2" variant="h6">
            Hasło
          </Typography>
          <Input
            label="Password"
            size="lg"
            crossOrigin={false}
            onChange={(e) => setPassword(e.target.value)}
            className={isLoading ? 'animate-pulse' : ''}
          />
          <div className="-ml-2.5 -mt-3">
            <Checkbox label="Remember Me" crossOrigin={false} />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" onClick={handleClick} fullWidth>
            {isLoading ? 'Przetwarzanie...' : 'Zaloguj'}
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

export default LoginModal;
