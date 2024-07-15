import mongoose from "mongoose";

export interface IGuild extends mongoose.Document {
  id: string;
  language: string;
  logChannel: string;
  embedColor: string;
  memberRoleId: string | null;
  welcome: {
    channelId: string | null;
    roleId: string | null;
  };
  reactions: {
    yes: string;
    no: string;
  };
  coins: {
    cooldown: string;
    min: number;
    max: number;
    bumpReward: number;
  };
  exp: {
    cooldown: string;
    min: number;
    max: number;
  };
  rooms: {
    category: string;
    prefix: string;
    price: number;
  };
};

const GuildSchema = new mongoose.Schema<IGuild>({
  id: { type: String, required: true },
  language: { type: String, default: "ru" },
  logChannel: String,
  embedColor: { type: String, default: "D381D2" },
  memberRoleId: { type: String, default: null },
  welcome: {
    type: Object,
    default: {
      channelId: null,
      roleId: null,
    },
  },
  reactions: {
    type: Object,
    default: {
      yes: "✅",
      no: "❎",
    },
  },
  coins: {
    type: Object,
    default: {
      cooldown: "5s",
      min: 50,
      max: 85,
      bumpReward: 0,
    },
  },
  exp: {
    type: Object,
    default: {
      cooldown: "5s",
      min: 15,
      max: 35,
    },
  },
  rooms: {
    category: String,
    prefix: String,
    price: Number,
    manager: String,
    name: String,
  },
});

export default mongoose.models.Guild ||  mongoose.model<IGuild>("Guild", GuildSchema);
