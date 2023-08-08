import { NextRequest, NextResponse } from "next/server";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";
// POST /api/questions
export const POST = async (req: NextRequest, res: Response) => {
   try {
      // const session = await getAuthSession();
      // if (!session?.user) {
      //    console.log('this is the issue', session)
      //    return NextResponse.json({ error: 'You are not logged in' }, { status: 401 });
      // }
      const body = await req.json();
      const { amount, topic, type } = quizCreationSchema.parse(body);
      let questions: any;
      if (type === "open_ended") {
         questions = await strict_output(
            'You are an helpful AI that is able to generate a pair of questions and answers. The length of the answer should not exceed 15 words. We want you to store all the pairs of questions and answers in a JSON array',
            new Array(amount).fill(`You are to generate a random hard open_ended question about the topic ${topic}`),
            {
               question: 'question',
               answer: "answer with max length of 15 words"
            }
         )
      } else if (type === "mcq") {
         questions = await strict_output(
            'You are an helpful AI that is able to generate mcq questions and answers. The length of each answer should not exceed 15 words',
            new Array(amount).fill(`You are to generate a random hard mcq question about the topic ${topic}`),
            {
               question: 'question',
               answer: "answer with max length of 15 words",
               option1: '1st option with max length of 15 words',
               option2: '2nd option with max length of 15 words',
               option3: '3rd option with max length of 15 words'
            }
         )
      }
      return NextResponse.json({ questions }, { status: 200 });
   } catch (error) {
      if (error instanceof ZodError) {
         return NextResponse.json({ error: error.issues }, { status: 400 });
      }
   }
};