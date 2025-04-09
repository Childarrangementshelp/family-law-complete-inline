import { useState } from 'react';
import Image from 'next/image';

const guideSections = [
  {
    title: "What is a McKenzie Friend?",
    image: "/images/mckenzie/McKenzieFriend1.png",
    text: `A McKenzie Friend is someone who can support you in court if you are representing yourself, known as a litigant in person. The term comes from the case McKenzie v McKenzie (1970), where the court confirmed that people should be allowed to have someone beside them to assist, even if that person is not legally qualified.

Your McKenzie Friend could be:
- A family member
- A friend
- Or someone with legal knowledge

Their role is to offer emotional support, help you prepare your case, and guide you through the process. They cannot speak for you in court, but they can be a calm, steady presence by your side.`,
  },
  {
    title: "Can anyone have a McKenzie Friend?",
    image: "/images/mckenzie/McKenzieFriend2.png",
    text: `Yes, in most situations, you are allowed to bring a McKenzie Friend with you to court. But there are a few rules:

- They must not be directly involved in your case. For example, a new partner or someone with a personal interest may not be allowed.
- The judge has the final say. If the court believes someone is likely to cause disruption or act inappropriately, they can be refused permission.

That said, most McKenzie Friends who behave respectfully and professionally are allowed to assist without issue.`,
  },
  {
    title: "Are they allowed to speak in court?",
    image: "/images/mckenzie/McKenzieFriend3.png",
    text: `No, McKenzie Friends do not have the right to speak during the hearing, question witnesses, or act as your legal representative. Their role is supportive, not legal advocacy.

However, they can play a crucial role behind the scenes and during the hearing by:
- Taking notes
- Helping you stay calm and focused
- Offering quiet advice
- Assisting with organisation and paperwork

They can also help you draft important documents, including witness statements. While they cannot sign or submit anything on your behalf, they can:
- Help you structure your statement
- Make sure you include relevant and clear information
- Review it with you so you feel confident submitting it`,
  },
  {
    title: "Are all McKenzie Friends the same?",
    image: "/images/mckenzie/McKenzieFriend4.png",
    text: `No, and this is important to understand. The title McKenzie Friend is not regulated. That means anyone can call themselves one, whether or not they have any legal training or experience.

McKenzie Friends can include:
- People who have been through the family court system themselves
- Law students working toward professional qualifications
- Individuals offering support as a paid service
- Volunteers who simply want to help

Because of this, the quality of support varies widely. It is important to choose someone you feel comfortable with and who genuinely understands how the court process works.`,
  },
  {
    title: "What makes our McKenzie Friends different?",
    image: "/images/mckenzie/McKenzieFriend5.png",
    text: `The McKenzie Friends working with us have all experienced the family court process first-hand. They understand not just the legal side, but the emotional strain it can bring.

They are also in the final stages of studying law at undergraduate or postgraduate level, and they have been carefully selected for their:
- Specialist knowledge in family law
- Client-centred and child-focused approach
- Empathy, professionalism, and clear communication

You are not just getting help — you are getting informed, compassionate support from someone who knows what it is like to be in your shoes.`,
  },
  {
    title: "How much does a McKenzie Friend cost?",
    image: "/images/mckenzie/McKenzieFriend6.png",
    text: `Costs can vary depending on:
- The level of support you need
- How complex your case is
- Whether court attendance or travel is required

We aim to keep our services affordable, transparent, and flexible, offering:
- Free guidance where possible
- Fixed-fee packages
- Pay-as-you-go support

This way, you can get the help you need without the stress of unexpected costs.`,
  },
  {
    title: "Final Thoughts",
    image: "/images/mckenzie/McKenzieFriend7.png",
    text: `Navigating family court can be tough, especially on your own. A McKenzie Friend can make the process feel less isolating, helping you prepare and present your case with clarity and confidence.

If you would like to learn more or speak with one of our trained McKenzie Friends, get in touch — we are here to help.`,
  },
];

export default function McKenzieFriendPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 text-center mb-12">
          McKenzie Friend Guide
        </h1>

        {guideSections.map((section, index) => (
          <div key={index} className="mb-10 text-center">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left sm:text-center"
            >
              <h2 className="text-2xl font-semibold text-blue-700 hover:underline inline-block mb-2">
                {section.title}
              </h2>
            </button>

            {openIndex === index && (
              <div>
                <div className="flex justify-center mb-6">
                  <Image
                    src={section.image}
                    alt={section.title}
                    width={800}
                    height={450}
                    className="rounded shadow"
                  />
                </div>
                <p className="whitespace-pre-line text-lg leading-relaxed text-gray-800 mx-auto">
                  {section.text}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
