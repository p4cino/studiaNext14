'use client';
import React, { FunctionComponent } from 'react';

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

const LoginModal: FunctionComponent<ILoginModal> = ({ popupStateHandler, popupOpenState }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

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
            Sign In
          </Typography>
          <Typography className="mb-3 font-normal" variant="paragraph" color="gray">
            Enter your email and password to Sign In.
          </Typography>
          <Typography className="-mb-2" variant="h6">
            Your Email
          </Typography>
          <Input label="Email" size="lg" crossOrigin={false} />
          <Typography className="-mb-2" variant="h6">
            Your Password
          </Typography>
          <Input label="Password" size="lg" crossOrigin={false} />
          <div className="-ml-2.5 -mt-3">
            <Checkbox label="Remember Me" crossOrigin={false} />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" onClick={popupStateHandler} fullWidth>
            Sign In
          </Button>
          <Typography variant="small" className="mt-4 flex justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
              onClick={popupStateHandler}
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

export default LoginModal;
