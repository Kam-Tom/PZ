using Microsoft.EntityFrameworkCore;
using DB.Models;

namespace DB;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options) { }

    public DbSet<Category> Categories { get; set; }

    public DbSet<Order> Orders { get; set; }

    public DbSet<OrderItem> OrderItems { get; set; }

    public DbSet<Payment> Payments { get; set; }

    public DbSet<Product> Products { get; set; }

    public DbSet<ProductFile> ProductFiles { get; set; }

    public DbSet<ProductImage> ProductImages { get; set; }

    public DbSet<Promotion> Promotions { get; set; }

    public DbSet<Review> Reviews { get; set; }

    public DbSet<ShippingMethod> ShippingMethods { get; set; }

    public DbSet<User> Users { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("DreamyGadget");

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Category");
            entity.Property(e => e.Id).UseIdentityColumn();
            
            entity.ToTable("Categories");

            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(true);


            entity.HasOne(d => d.ParentCategory).WithMany(p => p.Subcategories)
                .HasForeignKey(d => d.ParentCategoryId)
                .HasConstraintName("FK_Category_ParentCategory");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Order");
            entity.Property(e => e.Id).UseIdentityColumn();
            
            entity.ToTable("Orders");

            entity.Property(e => e.Date)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_User_Orders");
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_OrderItem");
            entity.Property(e => e.Id).UseIdentityColumn();

            entity.Property(e => e.Cost)
                .HasPrecision(10,2);

            entity.ToTable("OrderItems");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK_Order_OrderItems");

            entity.HasOne(d => d.Product).WithMany()
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK_Product_OrderItems");
        });

        modelBuilder.Entity<Payment>(entity =>
        {

            entity.HasKey(e => e.Id).HasName("PK_Payment");
            entity.Property(e => e.Id).UseIdentityColumn();

            entity.ToTable("Payments");

            entity.HasOne(d => d.Order).WithMany(p => p.Payments)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK_Order_Payments");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Product");
            entity.Property(e => e.Id).UseIdentityColumn();

            entity.ToTable("Products");

            entity.Property(e => e.Netto)
                .HasPrecision(10, 2);

            entity.Property(e => e.Name)
                .HasMaxLength(255)
                 .IsUnicode(true);

            entity.Property(e => e.Description)
                 .IsUnicode(true);


            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK_Category_Products");

        });

        modelBuilder.Entity<ProductFile>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ProductFile");
            entity.Property(e => e.Id).UseIdentityColumn();

            entity.ToTable("ProductFiles");

            entity.Property(e => e.Description)
                .IsUnicode(true);

            entity.Property(e => e.FilePath)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Product).WithMany(p => p.Files)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK_Product_ProductFiles");
        });

        modelBuilder.Entity<ProductImage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ProductImage");
            entity.Property(e => e.Id).UseIdentityColumn();

            entity.ToTable("ProductImages");

            entity.Property(e => e.ImagePath)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Product).WithMany(p => p.Images)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK_Product_ProductImages");
        });

        modelBuilder.Entity<Promotion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Promotion");
            entity.Property(e => e.Id).UseIdentityColumn();

            entity.ToTable("Promotions");


            entity.Property(e => e.Description)
                .IsUnicode(true);

            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(true);

            entity.Property(e => e.Start)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Review");

            entity.Property(e => e.Id).UseIdentityColumn();

            entity.ToTable("Reviews");

            entity.Property(e => e.Comment)
                .HasMaxLength(4096)
                .IsUnicode(true);


            entity.HasOne(d => d.Product).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK_Product_Reviews");

            entity.HasOne(d => d.User).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_User_Reviews");
        });

        modelBuilder.Entity<ShippingMethod>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ShippingMethod");

            entity.Property(e => e.Id).UseIdentityColumn();

            entity.ToTable("ShippingMethods");

            entity.Property(e => e.Cost)
                .HasPrecision(10, 2);


            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);

        });


        modelBuilder.Entity<User>(entity =>
        {

            entity.HasKey(e => e.Id).HasName("PK_User");

            entity.Property(e => e.Id).UseIdentityColumn();

            entity.ToTable("Users");

            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(true);

            entity.HasIndex(e => e.Email).IsUnique();

            entity.Property(e => e.PasswordHash)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.Property(e => e.ShippingAddress)
                .HasMaxLength(255)
                .IsUnicode(true);

            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .IsUnicode(true);
        });

    }

}
