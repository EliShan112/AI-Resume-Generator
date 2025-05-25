import { NextRequest, NextResponse } from "next/server";

// This is the fake response generator. Later, replace with OpenAI API again.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const requiredFields = ['fullName', 'jobTitle', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Create a mock/fake resume response
    const resumeText = `
${body.fullName}
${body.jobTitle}
Email: ${body.email} | Phone: ${body.phone} | Location: ${body.location || "N/A"}

Professional Summary:
${body.summary}

Skills:
${typeof body.skills === 'string' ? body.skills : body.skills?.join(', ') || 'N/A'}

Experience:
${body.experience || 'N/A'}

Education:
${body.education || 'N/A'}

Projects:
${body.projects || 'N/A'}
    `;

    return NextResponse.json({ resume: resumeText.trim() });
  } catch (error) {
    console.error("Resume generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate resume. Please try again." },
      { status: 500 }
    );
  }
}



// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     // Destructure all necessary fields from request body
//     const {
//       fullName,
//       email,
//       phone,
//       jobTitle,
//       location,
//       summary,
//       skills,
//       experience,
//       education,
//       projects,
//     } = body;

//     // Basic validation: check required fields (add more as needed)
//     if (
//       !fullName ||
//       !email ||
//       !phone ||
//       !jobTitle ||
//       !summary ||
//       !skills ||
//       !experience ||
//       !education
//     ) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Format skills array if it's a string or array
//     let skillsList = skills;
//     if (typeof skills === "string") {
//       skillsList = skills.split(",").map((s) => s.trim());
//     }

//     // Construct prompt for OpenAI
//     const prompt = `
// You are a professional resume writer. Create an ATS-friendly resume for the following person:

// Name: ${fullName}
// Email: ${email}
// Phone: ${phone}
// Job Title: ${jobTitle}
// Location: ${location || "N/A"}
// Summary: ${summary}

// Skills:
// ${skillsList.map((skill: string) => `- ${skill}`).join("\n")}

// Experience:
// ${experience}

// Education:
// ${education}

// Projects:
// ${projects || "N/A"}

// Write in a proper resume format, use bullet points where appropriate, keep it concise and professional.
// `;

//     // Call OpenAI's chat/completions API
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are a helpful assistant that writes professional resumes in ATS-friendly format.",
//         },
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//       max_tokens: 1500,
//       temperature: 0.7,
//     });

//     const resumeText = response.choices[0].message.content;

//     return NextResponse.json({ resume: resumeText });
//   } catch (error) {
//     console.error("Error generating resume:", error);
//     return NextResponse.json(
//       { error: "Failed to generate resume, please try again later." },
//       { status: 500 }
//     );
//   }
// }
