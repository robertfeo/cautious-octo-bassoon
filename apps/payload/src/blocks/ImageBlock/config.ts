import { uploadFromUrl } from "@/hooks/uploadFromUrl";
import { Block } from "payload";

export const ImageBlock: Block = {
  slug: "image",
  labels: {
    singular: "Image Block",
    plural: "Image Blocks",
  },
  fields: [
    {
      name: "image",
      label: "Image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "url",
      label: "Image URL",
      type: "text",
      hooks: {
        afterChange: [
          async ({ value, siblingData, req, data }) => {
            // Upload the image from the URL
            const uploadedFile = await uploadFromUrl({
              value,
              siblingData,
              req,
              caption: siblingData?.caption,
            });

            console.log(
              "UPLOADED FILE:",
              JSON.stringify(uploadedFile, null, 2),
            );

            if (uploadedFile?.id) {
              siblingData.image = uploadedFile.id;

              console.log(
                "SIBLING DATA:",
                JSON.stringify(siblingData, null, 2),
              );

              const page = await req.payload.find({
                collection: "pages",
                depth: 2,
                where: {
                  "layout.id": { equals: siblingData.id },
                },
              });

              console.log("PAGE: " + JSON.stringify(page, null, 2));

              if (page.docs.length > 0) {
                const pageToUpdate = page.docs[0];
                const updatedImageBlock = pageToUpdate.layout.map(
                  (block: any) =>
                    block.id === siblingData.id
                      ? { ...block, image: uploadedFile.id }
                      : block,
                );

                console.log(
                  "UpdatedLayout: " +
                    JSON.stringify(updatedImageBlock, null, 2),
                );
                console.log(
                  "PageToUpdate: " + JSON.stringify(pageToUpdate, null, 2),
                );

                const response = await req.payload.update({
                  collection: "pages",
                  id: pageToUpdate.id,
                  data: {
                    layout: updatedImageBlock,
                  },
                });

                console.log("RESPONSE: " + JSON.stringify(response, null, 2));
              } else {
                console.error(
                  "No matching page found for the block ID:",
                  siblingData.id,
                );
              }
            }
          },
        ],
      },
    },
    {
      name: "caption",
      label: "Caption",
      type: "text",
    },
  ],
};
