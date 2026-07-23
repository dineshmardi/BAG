import { MessageActions } from "@/components/admin/contact/message-actions";
import Contact from "@/models/Contact";
import { connectDB } from "@/lib/mongodb";


export default async function AdminMessagesPage() {
    await connectDB();

    const messages = await Contact.find({})
        .sort({ createdAt: -1 })
        .lean();

    return (
        <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Customer Messages
                </h1>

                <p className="mt-2 text-gray-500">
                    View messages submitted through your contact form.
                </p>
            </div>

            {/* Empty State */}
            {messages.length === 0 ? (
                <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">
                    <h2 className="text-xl font-semibold">
                        No messages yet
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Customer messages will appear here.
                    </p>
                </div>
            ) : (
                /* Messages */
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message._id.toString()}
                            className="rounded-2xl border bg-white p-6 shadow-sm"
                        >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h2 className="text-lg font-semibold">
                                            {message.name}
                                        </h2>

                                        {message.status === "NEW" && (
                                            <span className="inline-flex min-w-[64px] items-center justify-center rounded-full bg-black px-5 py-3 text-xs font-semibold leading-none tracking-[0.08em] text-white">
                                                NEW
                                            </span>
                                        )}
                                    </div>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {message.email}
                                    </p>
                                </div>

                                <p className="text-sm text-gray-400">
                                    {new Date(
                                        message.createdAt
                                    ).toLocaleString("en-IN")}
                                </p>
                            </div>

                            <div className="mt-5 border-t pt-5">
                                <p className="text-sm font-medium text-gray-500">
                                    Subject
                                </p>

                                <h3 className="mt-1 font-semibold">
                                    {message.subject}
                                </h3>

                                <p className="mt-4 whitespace-pre-wrap leading-7 text-gray-600">
                                    {message.message}
                                </p>
                            </div>

                            <MessageActions
                                messageId={message._id.toString()}
                                status={message.status}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}