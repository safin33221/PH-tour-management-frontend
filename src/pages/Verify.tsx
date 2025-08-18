import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export default function Verify() {
  const location = useLocation()
  const navigate = useNavigate()
  const [email] = useState(location.state)
  const [confirm, setConfirm] = useState(false)
  const [sendOtp] = useSendOtpMutation()
  const [verifyOtp] = useVerifyOtpMutation()
  const [time, setTime] = useState(5)

  useEffect(() => {
    if (!email) {
      navigate("/")
    }
  }, [email])

  useEffect(() => {
    const timerId = setInterval(() => {
      if (!email && !confirm) {
        return
      }
      setTime((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000);
    return () => clearInterval(timerId)
  }, [email, confirm])
  console.log(location);
  const handleSendOTp = async () => {
    const toastId = toast.loading("sending otp")
    try {
      const res = await sendOtp({ email: email }).unwrap()
      if (res.success) {
        toast.success("OTP sent successfully", { id: toastId })
        setConfirm(true)
        setTime(5)
      }

    } catch (error) {
      console.log(error);
    }

  }
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })


  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const toastId = toast.loading("Verifying OTP")
      const userInfo = {
        email,
        otp: data.pin
      }
      const res = await verifyOtp(userInfo).unwrap()
      if (res.success) {
        toast.success("OTP Verified", { id: toastId })
        setConfirm(true)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (

    <div className=" border-2 grid place-content-center h-screen">
      {
        confirm ? (
          <Card className=" border-2 p-10">
            <CardHeader>
              <CardTitle>Verify Your Email Address</CardTitle>
              <CardDescription>
                Please Enter the 6 digit code we sent to <br /> Email
              </CardDescription>

            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form id="otp-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>One-Time Password</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                            </InputOTPGroup>
                            <InputOTPGroup>
                              <InputOTPSlot index={1} />
                            </InputOTPGroup>
                            <InputOTPGroup>
                              <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <Dot />
                            <InputOTPGroup>
                              <InputOTPSlot index={3} />
                            </InputOTPGroup>
                            <InputOTPGroup>
                              <InputOTPSlot index={4} />
                            </InputOTPGroup>
                            <InputOTPGroup>
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormDescription className="flex flex-col">
                          Please enter the one-time password sent to your phone.

                          <Label>
                            <Button type="button"
                              onClick={handleSendOTp}
                              variant={"link"}
                              disabled={time != 0}
                              className={cn("p-0 m-0", {
                                "cursor-pointer": time === 0,
                                "text-gray-600": time !== 0,
                              })}
                            >
                              Resent otp
                            </Button>
                            {time} s
                          </Label>

                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex gap-2 justify-end">
              <Button form="otp-form" type="submit" className=" w-fit  ">
                Submit
              </Button>

            </CardFooter>
          </Card >
        ) : (
          <Card className=" border-2 p-10">
            <CardHeader>
              <CardTitle>Verify Your Email Address</CardTitle>
              <CardDescription>
                We will sent an OTP at <br /> {email}
              </CardDescription>

            </CardHeader>

            <CardFooter className="flex gap-2 justify-end">
              <Button
                onClick={handleSendOTp}
                form="otp-form" type="submit" className=" w-[300px]  ">
                confirm
              </Button>

            </CardFooter>
          </Card >
        )
      }





    </div >
  )
}


