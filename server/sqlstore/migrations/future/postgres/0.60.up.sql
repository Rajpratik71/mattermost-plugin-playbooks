ALTER TABLE IR_Playbook ADD COLUMN IF NOT EXISTS CreateChannelMemberOnNewParticipant BOOLEAN DEFAULT TRUE;
ALTER TABLE IR_Playbook ADD COLUMN IF NOT EXISTS RemoveChannelMemberOnRemovedParticipant BOOLEAN DEFAULT TRUE;
ALTER TABLE IR_Incident ADD COLUMN IF NOT EXISTS CreateChannelMemberOnNewParticipant BOOLEAN DEFAULT TRUE;
ALTER TABLE IR_Incident ADD COLUMN IF NOT EXISTS RemoveChannelMemberOnRemovedParticipant BOOLEAN DEFAULT TRUE;


UPDATE IR_Playbook SET CreateChannelMemberOnNewParticipant = true, RemoveChannelMemberOnRemovedParticipant = true;
UPDATE IR_Incident SET CreateChannelMemberOnNewParticipant = true, RemoveChannelMemberOnRemovedParticipant = true;
