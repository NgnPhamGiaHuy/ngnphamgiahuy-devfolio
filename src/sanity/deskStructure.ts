import { StructureBuilder } from "sanity/structure";

export const deskStructure = (S: StructureBuilder) =>
    S.list()
        .title("Content")
        .items([
            S.listItem()
                .title("Profile")
                .icon(() => "👤")
                .child(
                    S.document()
                        .schemaType("profile")
                        .documentId("profile")
                        .title("Personal Profile")
                ),
            S.listItem()
                .title("Settings")
                .icon(() => "⚙️")
                .child(
                    S.document()
                        .schemaType("settings")
                        .documentId("settings")
                        .title("Website Settings & Sections")
                ),
            S.documentTypeListItem("service")
                .title("Services")
                .icon(() => "🛠️"),
            S.documentTypeListItem("skill")
                .title("Skills")
                .icon(() => "💻"),
            S.documentTypeListItem("project")
                .title("Projects")
                .icon(() => "🚀"),
            S.documentTypeListItem("experience")
                .title("Experience")
                .icon(() => "💼"),
            S.documentTypeListItem("education")
                .title("Education")
                .icon(() => "🎓"),
            S.documentTypeListItem("certificate")
                .title("Certificates")
                .icon(() => "🏆"),
            S.documentTypeListItem("testimonial")
                .title("Testimonials")
                .icon(() => "💬"),
            S.documentTypeListItem("pricing")
                .title("Pricing")
                .icon(() => "💰"),
            S.documentTypeListItem("blogPost")
                .title("Blog Posts")
                .icon(() => "📝"),
        ]);
