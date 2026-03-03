import { ContactChannels } from "@/components/contact-channels"
import { SoundProvider } from "@/hooks/use-sound"

export default function ContactChannelsPage() {
  return (
    <SoundProvider>
      <ContactChannels />
    </SoundProvider>
  )
}
