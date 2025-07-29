import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, NotebookText } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { handleSignup } from '@/actions/userActions';

const signupSchema = z.object({
  username: z
    .string({ error: 'Required!' })
    .min(2, {
      error: 'Username must be atleast 2 characters.',
    })
    .max(20, {
      error: 'Username must be less than 20 characters.',
    }),
  email: z.email({ error: 'invalid email address' }),
  password: z
    .string({ error: 'Required!' })
    .min(6, {
      error: 'Password must be atleast 6 characters.',
    })
    .max(20, {
      error: 'Password must be less than 20 characters!',
    }),
});

type SignupTypes = z.infer<typeof signupSchema>;

const Signup = () => {
  const form = useForm<SignupTypes>({
    resolver: zodResolver(signupSchema),
  });
  const nav = useNavigate();

  const mutation = useMutation({
    mutationFn: handleSignup,
    onSuccess: () => {
      nav('/login');
    },
  });

  const onSubmit = (values: SignupTypes) => {
    console.log(values);
    mutation.mutate(values);
  };

  return (
    <div className="bg-accent w-full h-screen flex flex-col items-center justify-center gap-4 ">
      <a href="#" className="flex items-center gap-2 self-center font-medium">
        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
          <NotebookText className="size-4" />
        </div>
        PaperTrail Inc.
      </a>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[400px] flex flex-col gap-3 bg-primary-foreground p-6 rounded-lg shadow-lg"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={mutation.isPending} className="mt-3">
            {mutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              'Signup'
            )}
          </Button>
          <Label className="mt-3 flex items-center justify-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to={'/login'} className="underline underline-offset-4">
              Log in
            </Link>
          </Label>
        </form>
      </Form>
      <div className="w-[20%] text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default Signup;
